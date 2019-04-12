import firebase from 'firebase/app';
import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('firebaseStore')
@observer
export class Home extends React.Component {

	render() {
		const { currentUser } = firebase.auth();

		return currentUser && (
			<h1>
				Welcome {currentUser.displayName}
			</h1>
		)
	}
}