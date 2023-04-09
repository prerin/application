const ExpreeError = require('./utils/ExpressError')
const { campgroundShema, reviewSchema } = require('./schemas')
const Campground = require('./models/campground')
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'ログインしてください')
        return res.redirect('/login')
    }
    next()
}

module.exports.validateCammpground = (req,res, next) => {
    const { error } = campgroundShema.validate(req.body)
    if (error) {
        const msg = error.details.map(detail => detail.message).join(',')
        throw new ExpreeError(msg, 400)
    } else {
        next()
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if(!req.user._id.equals(campground.author)) {
        req.flash('error', 'そのアクションの権限がありません')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(detail => detail.message).join(',')
        throw new ExpreeError(msg, 400)
    } else {
        next()
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if(!req.user._id.equals(review.author)) {
        req.flash('error', 'そのアクションの権限がありません')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}