import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const BookingCardItem = (props) => {
  return (
    <div className="card " style={{ maxHeight: '100%', padding: '1px' }}>
      <figure className="cards__item__pic-wrap" data-category={props.label}>
        <img
          src={props.src}
          alt="service Image"
          className="cards__item__img card-img-top"
        />
      </figure>
      <div className="card-body">
        <h5 className="card-title">
          <i className="fa fa-street-view" aria-hidden="true"></i> {props.venue}
        </h5>
        <p className="card-text">
          {' '}
          <i className="fa fa-map-marker-alt" aria-hidden="true"></i>{' '}
          {props.location}
        </p>
        <NavLink exact to={props.handleNavLink} state={props.src,props.label} className="btn btn-primary">
          Book Service Now
        </NavLink>
      </div>
    </div>
  )
}

export default BookingCardItem
