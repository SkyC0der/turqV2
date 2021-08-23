import React from "react"
import Truncate from "react-truncate"
import { Link } from "react-router-dom"
import { LEGISLATION_PAGE_URL } from "../../constants"
import PropTypes from "prop-types"

function LegislationListItem ({description, title, id, firebaseRef}) {
return(
    <div className="row">
        <div className=" col">
            <hr />
            <Link to={LEGISLATION_PAGE_URL + "/" + id + "?ref=" + firebaseRef}><h4>{title}</h4></Link>
            <Truncate lines={2}>
                {description}
            </Truncate>
        </div>
    </div>
)
}

export default LegislationListItem

LegislationListItem.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number
}

LegislationListItem.defaultProps = {
  description: "",
  title: "",
  id: null
}