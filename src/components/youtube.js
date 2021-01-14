import React from "react"

/*
This component creates an embedded YouTube video. You can give it a video ID
or playlist ID, and it can be customized to include  start and stop times

PARAMETERS:
title="Video title"
src="youtubeVideoIdHash" If embedding a playlist, include only the playlist ID (starts with PL)
start="60" integer value for number of seconds from the beginning to start at.
end="120" integer value for number of seconds from the beginning to end at
  Note that this value is measure from the start of the video, not the start of playback as specified by start.

For reference, see https://developers.google.com/youtube/player_parameters
*/

const Youtube = ( props ) => { //Construct our component as a function

  const title = props.title

  // Define the base URL for YouTube links
  var pathBase = new URL('../embed', 'https://www.youtube.com')
  // Create an object to hold UTM parameters
  var ytParams = new URLSearchParams()
  // Construct the video ID or playlist UTM
  if (props.src.indexOf('PL') === 0) {
    ytParams.append('listType', 'playlist')
    ytParams.append('list', props.src)
    } else {pathBase.pathname = `../embed/${props.src}`}
  // Add Start and Stop times
  if (props.start) {ytParams.append('start', props.start)}
  if (props.end) {ytParams.append('end', props.end)}
  ytParams.append('rel', 0)

  //console.log(`pathBase ${typeof pathBase}: ${pathBase}`) // For Debugging
  //console.log(`ytParams ${typeof ytParams}: ${ytParams}`) // For Debugging

  return (// Return the iframe, wrapped in a div.
    <div
      className="gatsby-resp-iframe-wrapper"
      style={{
        paddingBottom: "56.5%",
        position: "relative",
        height: "0px",
        overflow: "hidden",
      }}
    >
      <div className="embedVideo-container">
        <iframe
          title={`${title} Video`}
          src={pathBase.toString() + '?' + ytParams.toString()}
          className="embedVideo-iframe"
          allowFullScreen=""
          frameBorder="0"
          style={{
            border: "0px",
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  )
}

export default Youtube
