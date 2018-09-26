import React from 'react';

const Note = (props) => {
	return (
		<div className="note-container">
			<div className="note">{props.text}
				<div className="date-container"><small>{props.date}</small></div>
			</div>
			<div className="delete-btn" onClick={props.onClickHandler}> X </div>
		</div>
	);
}

export default Note;