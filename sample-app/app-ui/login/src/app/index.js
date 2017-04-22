export default ({body, title, initialState, styles, manifestContent}) => {
    return `
	    <!DOCTYPE html>
	    <html>
	      	<head>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	        	<script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
	        	<title>${title}</title>
	        	<style>${styles}</style>
	      	</head>
	      	<body>
	        	<div id="login">${body}</div>
	      	</body>
	    </html>
  	`;
};
