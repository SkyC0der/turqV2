import React from "react"
import PropTypes from "prop-types"

import LegislationListItem from "./legislationListItem"

function LegislationList ({legislation}) {
  legislation = legislation ? legislation : []
  const legislationList = legislation
    .map(law => <LegislationListItem
                  title={law.title}
                  description={law.accomplishes}
                  key={law.id}
                  id={law.id}
                  firebaseRef={law.ref}
                />)
return(
    <div className="row">
        <div className="col">
            {legislationList.length > 0 ? 
            legislationList 
            : <p> -- Be the first to create new legislation for this issue! -- </p>
            }
            <hr />
        </div>
    </div>
)
}

export default LegislationList

LegislationList.propTypes = {
  legislation: PropTypes.array
}

LegislationList.defaultProps = {
  legislation: []
}