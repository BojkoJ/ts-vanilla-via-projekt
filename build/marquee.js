function startMarquee(id, pathId, content, speed) {
	const textPath = document.getElementById(id);
	const path = document.getElementById(pathId);
	const pathLength = path.getTotalLength();
	textPath.innerHTML = content;

	let offset = 0;

	function animateText() {
		offset -= speed;
		if (offset < 0) {
			offset = pathLength;
		} else if (offset > pathLength) {
			offset = 0;
		}
		textPath.setAttribute("startOffset", `${offset}px`);
		requestAnimationFrame(animateText);
	}

	animateText();
}

document.addEventListener("DOMContentLoaded", () => {
	const textContent1 =
		'<a  style="text-decoration: none;">Featured Product&nbsp;&nbsp;&nbsp;</a>'.repeat(
			100
		);
	startMarquee("marquee-text", "text-path", textContent1, 0.3);
});
