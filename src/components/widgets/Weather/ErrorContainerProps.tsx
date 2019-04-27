import * as React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
interface ErrorContainerProps {
	message: string;
}
export const ErrorContainer = ({ message }: ErrorContainerProps) => (
	<Card>
		<CardContent>
			<Typography variant='title'>{message}</Typography>
		</CardContent>
	</Card>
);
