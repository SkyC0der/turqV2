import React from "react"
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function LegislationText ({title, content}) {
  return (
    <Card>
      <CardContent>
        <h1 className="legislation-title">{title}</h1>
        <ReactMarkdown className="legislation-SectionText" source={content} />
      </CardContent>
    </Card>
  )
}

export default LegislationText 

LegislationText.propTypes = {
  title: PropTypes.string,
  contest: PropTypes.string,
}

LegislationText.defaultProps = {
  title: "",
  contest: ""
}