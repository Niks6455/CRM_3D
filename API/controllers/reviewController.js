import Review from "../models/reviews.js";

export default {

   async getReviews(req, res) {
      try {
         const reviews = await Review.findAll();
         res.json(reviews);
      } catch (e) {
         res.status(500).json(e);
      }
   },

   async createReview(req, res) {
      try {
         const review = await Review.create({ review: req.body.review });
         res.json(review);
      } catch (e) {
         res.status(500).json(e);
      }
   },

   async getReview(req, res) {
      try {
         const review = await Review.findByPk(req.params.id);
         res.json(review);
      } catch (e) {
         res.status(500).json(e);
      }
   },

}
