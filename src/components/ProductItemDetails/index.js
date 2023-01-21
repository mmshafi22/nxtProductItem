import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const productApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    loadingStatus: productApiStatus.initial,
    productDetails: [],
    quantity: 1,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  onClickShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  getProductItemDetails = async () => {
    this.setState({loadingStatus: productApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        id: data.id,
        title: data.title,
        brand: data.brand,
        price: data.price,
        description: data.description,
        imageUrl: data.image_url,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products,
      }
      this.setState({
        loadingStatus: productApiStatus.success,
        productDetails: formattedData,
      })
    } else {
      this.setState({loadingStatus: productApiStatus.failure})
    }
  }

  renderTheLoaderPage = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderTheProductPage = () => {
    const {productDetails, quantity} = this.state
    const {
      title,
      brand,
      imageUrl,
      price,
      description,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productDetails

    const updatedProducts = similarProducts.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      price: eachItem.price,
      rating: eachItem.rating,
      brand: eachItem.brand,
    }))

    return (
      <div className="product-similar-container">
        <div className="product-item-detail-container">
          <img src={imageUrl} alt="product" className="main-img-view" />
          <div className="detail-text">
            <h1 className="detail-heading">{title}</h1>
            <p className="detail-price">Rs {price}/-</p>
            <div className="rating-reviews">
              <div className="rating">
                <p>{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png "
                  alt="star"
                />
              </div>
              <p className="review">{totalReviews} Reviews</p>
            </div>
            <p className="description">{description}</p>
            <p className="detail-avail">
              Available: <span className="availability">{availability}</span>
            </p>
            <p className="detail-avail">
              Brand: <span className="availability">{brand}</span>
            </p>
            <hr />
            <div className="plus-minus-container">
              <button
                type="button"
                className="btn-plus-minus"
                onClick={this.onDecrement}
                data-testid="minus"
              >
                <BsDashSquare className="plus-minus-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="btn-plus-minus"
                onClick={this.onIncrement}
                data-testid="plus"
              >
                <BsPlusSquare className="plus-minus-icon" />
              </button>
            </div>
            <button className="btn-add-cart" type="button">
              Add To Cart
            </button>
          </div>
        </div>
        <h1 className="similar-heading">Similar Products</h1>
        <ul className="similar-products">
          {updatedProducts.map(each => (
            <SimilarProductItem product={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderTheFailurePage = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png "
        alt="error view"
      />
      <h1 className="fail-heading">Product Not Found</h1>
      <button
        className="btn-shopping"
        type="button"
        onClick={this.onClickShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  renderAllPages = () => {
    const {loadingStatus} = this.state
    switch (loadingStatus) {
      case productApiStatus.success:
        return this.renderTheProductPage()
      case productApiStatus.inProgress:
        return this.renderTheLoaderPage()
      case productApiStatus.failure:
        return this.renderTheFailurePage()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="product-bg-container">
        <Header />
        {this.renderAllPages()}
      </div>
    )
  }
}

export default ProductItemDetails
