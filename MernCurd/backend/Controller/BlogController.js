const { validateBlog } = require("../Models/Blog");

const { Create, GetDetail, Update, Delete } = require("../Service/blog.service");

exports.CreateBlog = async (req, res) => {
  validateBlog(req.body)
    .then(async (value) => {
      try {
        const blog = await Create(value);
        res.status(200).json({
          success: 1,
          message: "You have created Blog successfully.",
          blog: blog,
        });
      } catch (e) {
        res.status(400).json({ success: 0, message: e.message });
      }
    })
    .catch((e) => {
      res.status(400).json({ success: 0, message: e.message });
    });
};

exports.GetDeatilofBlog = async (req, res) => {
  try {
    const blog = await GetDetail(req.params.id);
    res.status(200).json({
      success: 1,
      message: "",
      blog: blog,
    });
  } catch (e) {
    res.status(400).json({ success: 0, message: e.message });
  }
};

exports.UpdateBlog = async (req, res) => {
  validateBlog(req.body)
    .then(async (value) => {
      try {
        let blog = await GetDetail(req.params.id);
        if (blog) {
          blog = await Update(req.params.id, value);
          res.status(200).json({
            success: 1,
            message: "",
            blog: blog,
          });
        } else {
          res.status(200).json({ success: 0, message: "Blog Post Not Found." });
        }
      } catch (e) {
        res.status(400).json({ success: 0, message: e.message });
      }
    })
    .catch((e) => {
      res.status(400).json({ success: 0, message: e.message });
    });
};

exports.DeleteBlog = async ( req,res) =>{
    try{
        let blog = await GetDetail(req.params.id);
        if (blog) {
          blog = await Delete(req.params.id);
          res.status(200).json({
            success: 1,
            message: "Blog Deleted Successfully.",
            blog: blog,
          });
        } else {
          res.status(200).json({ success: 0, message: "Blog Post Not Found." });
        }
    }catch(e){
        res.status(400).json({ success: 0, message: e.message });
    }
}


// exports.GetBlogList = async(req, res)=>{
//     try{
//         const 
//     }catch(e){
//         res.status(400).json({ success: 0, message: e.message });
//     }
// }