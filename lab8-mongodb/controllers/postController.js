const Post = require('../models/Post');
const Comment = require('../models/Comment');
const ApiError = require('../errors/ApiError');
const asyncHandler = require('../middlewares/asyncHandler');

exports.createPost = asyncHandler(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json({ success: true, data: post, message: 'Пост успішно створено' });
});

exports.getAllPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  const postsWithCommentCount = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countDocuments({ post: post._id });
      return { ...post.toObject(), commentCount };
    })
  );

  const total = await Post.countDocuments();
  res.status(200).json({ success: true, total, totalPages: Math.ceil(total / limit), currentPage: page, data: postsWithCommentCount });
});

exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw ApiError.notFound('Пост не знайдено');

  const comments = await Comment.find({ post: post._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: { post, comments } });
});

exports.searchPosts = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const posts = await Post.find({ $text: { $search: q } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } });
  res.status(200).json({ success: true, count: posts.length, data: posts });
});

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true, runValidators: true });
  if (!post) throw ApiError.notFound('Пост не знайдено');
  res.status(200).json({ success: true, data: post, message: 'Пост успішно оновлено' });
});

exports.likePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
  if (!post) throw ApiError.notFound('Пост не знайдено');
  res.status(200).json({ success: true, data: post, message: 'Лайк додано' });
});

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw ApiError.notFound('Пост не знайдено');

  await Comment.deleteMany({ post: req.params.id });
  await post.deleteOne();
  res.status(200).json({ success: true, message: 'Пост та всі коментарі видалено' });
});