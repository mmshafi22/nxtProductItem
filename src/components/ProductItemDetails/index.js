import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const productApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
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

  getProductItemDetails = async () => {
    this.setState({loadingStatus: productApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const productUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(productUrl, options)
      this.setState({loadingStatus: productApiStatus.failure})
    }
  }

  renderTheLoaderPage = () => (
    <div>
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderPro
      id,ductPage = () => {
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
    return (
      <div className="product-item-detail-container">
        <img src={imageUrl} alt={title} className="main-img-view" />
        <div className="detail-text">
          <h1 className="detail-heading">{title}</h1>
          <p className="detail-price">Rs {price}/-</p>
          <div className="rating-reviews">
            <div className="detail-rating">
              <p>{rating}</p>
              <img
                sr
            <p cla            </div>
          </div>
          <p className="detail-review">{totalReviews} Reviews</p>
        </div>
      </div>
    )
  }

  renderTheAllPages = () => {
    const {loadingStatus} = this.state
    switch (loadingStatus) {
      case productApiStatus.success:
        return this.renderProductPage()
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
        {this.renderTheAllPages()}
      </div>
    )
  }
}

      </div>
*/
