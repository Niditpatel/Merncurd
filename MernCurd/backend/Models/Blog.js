const mongoose = require("mongoose");
const Joi = require("joi");

//schema
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 5, maxLength: 100 },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Approved", "Pending", "Reject"],
      required: true,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

//Auto generate Slug before saving the blog
BlogSchema.pre("save", async () => {
  this.slug = `${this.title} - ${this.category}`;
});

// validate Blog
function validateBlog(blog) {
  const joiSchema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    description: Joi.string(),
    category: Joi.string().required(),
    status: Joi.string()
      .allow("Approved", "Pending", "Reject")
      .default("Pending")
      .required(),
    slug: Joi.string(),
  });

  return joiSchema.validateAsync(blog);
}

// model
const Blog = mongoose.model("blog", BlogSchema);

module.exports = { validateBlog, Blog };
