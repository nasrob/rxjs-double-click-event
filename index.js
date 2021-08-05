import { asyncScheduler, fromEvent } from "rxjs";
import { buffer, throttleTime, filter } from "rxjs/operators";

const messageP = document.createElement("p");
const textNode = document.createTextNode("Bingo!! It's a DOUBLE");
messageP.appendChild(textNode);

const messageDiv = document.querySelector(".message");

const clicks$ = fromEvent(document, "click");

clicks$
	.pipe(
		buffer(clicks$.pipe(throttleTime(250, asyncScheduler))),
		filter((clicksList) => clicksList.length > 1)
	)
	.subscribe((clicksList) => {
		console.log("Double Click");
		messageDiv.appendChild(messageP);
	});
