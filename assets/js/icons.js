/***********************************************************
 * Icons
***********************************************************/

const Gradient = (props) => (
	<defs>
		<linearGradient {...props} gradientTransform="rotate(90)">
			<stop offset="0%" stopColor="#FEE140" stopOpacity="1" />
			<stop offset="100%" stopColor="#FA709A" stopOpacity="1" />
		</linearGradient>
	</defs>
)

let iconNum = 1
const iconID = () => "woolook-icon-" + iconNum++

export const BlockIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />
            <path fill={ `url(#${id})` } d="M6 23.73l-3-2.122v-14.2l3 1.359v14.963zm2-14.855v15.125l13-1.954v-15.046l-13 1.875zm5.963-7.875c-2.097 0-3.958 2.005-3.962 4.266l-.001 1.683c0 .305.273.54.575.494.244-.037.425-.247.425-.494v-1.681c.003-1.71 1.416-3.268 2.963-3.268.537 0 1.016.195 1.384.564.422.423.654 1.035.653 1.727v1.747c0 .305.273.54.575.494.243-.037.423-.246.423-.492l.002-1.749c.002-1.904-1.32-3.291-3.037-3.291zm-6.39 5.995c.245-.037.427-.247.427-.495v-2.232c.002-1.71 1.416-3.268 2.963-3.268l.162.015c.366-.283.765-.513 1.188-.683-.405-.207-.858-.332-1.35-.332-2.096 0-3.958 2.005-3.962 4.266v2.235c0 .306.272.538.572.494z"/>
        </svg>
    )   
}

export const IconCheckChecked = () => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-5.541 8.409l-1.422-1.409-7.021 7.183-3.08-2.937-1.395 1.435 4.5 4.319 8.418-8.591z"/>
        </svg>
    )   
}

export const IconCheckUnchecked = () => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"/>
        </svg>
    )   
}

export const IconDesktop = () => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M2 0c-1.104 0-2 .896-2 2v15c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-15c0-1.104-.896-2-2-2h-20zm20 14h-20v-12h20v12zm-6.599 7c0 1.6 1.744 2.625 2.599 3h-12c.938-.333 2.599-1.317 2.599-3h6.802z"/>
        </svg>
    )   
}

export const IconMobile = () => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M5 3.461c0 .978.001 16.224 0 17.213-.002 2.214 3.508 3.326 7.014 3.326 3.495 0 6.986-1.105 6.986-3.326v-17.213c0-2.348-3.371-3.461-6.805-3.461-3.563 0-7.195 1.199-7.195 3.461zm7-1.461c.276 0 .5.223.5.5 0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-.277.224-.5.5-.5zm0 20c-.552 0-1-.448-1-1 0-.553.448-1 1-1s1 .447 1 1c0 .552-.448 1-1 1zm5-3h-10v-15h10v15z"/>
        </svg>
    )   
}

export const IconTablet = () => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M24 5c0-1.104-.896-2-2-2h-20c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-14zm-3 14h-18v-14h18v14zm1.5-6.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5z"/>
        </svg>
    )   
}
