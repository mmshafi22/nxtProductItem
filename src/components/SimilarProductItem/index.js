import './index.css'

const SimilarProductItem = props => {
  const {product} = props
  const {imageUrl, title, price, brand, rating} = product
  return (
    <li className="product-list-item">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-img"
      />
      <h1 className="similar-title">{title}</h1>
      <p className="similar-brand">by {brand}</p>
      <div className="rating-price">
        <p className="similar-price">Rs {price}</p>
        <div className="rating">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png "
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
