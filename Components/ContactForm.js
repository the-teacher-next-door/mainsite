import React from 'react';

const ContactForm = (props) => {

	const handleSubmit = () => {
		console.log('hello')
	}
	return (
		<form id="contact-form" onSubmit={handleSubmit} method="POST">
			<div className="form-group">
				<label for="name">Name</label>
				<input type="text" className="form-control" id="name" />
			</div>
			<div className="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
			</div>
			<div className="form-group">
				<label for="message">Message</label>
				<textarea className="form-control" rows="5" id="message"></textarea>
			</div>
			<button type="submit" className="btn btn-primary">Submit</button>
		</form>
	)
}

export default ContactForm;