import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

type ViewPortTypes = "phone" | "tablet" | "smlDesktop" | "lrgDesktop"
export const useResponsiveWidth = () => {
	const { width } = useWindowDimensions();

	const [viewport, setViewport] = useState<ViewPortTypes>()


	const W_MOBILE = 414;
	const W_TABLET = 820;
	const W_SMALL_DESKTOP = 1080;
	const W_LARGE_DESKTOP = 1440;
	useEffect(() => {
		if (width < W_MOBILE) {
			setViewport("phone");
			return;
		}
		if (width >= W_MOBILE && width < W_TABLET) {
			setViewport("tablet")
			return;
		}
		if (width > W_TABLET && width <= W_SMALL_DESKTOP) {
			setViewport("smlDesktop");
		}
		if (width > W_LARGE_DESKTOP) {
			setViewport("lrgDesktop")
		}

	}, [width])

	return { viewport }
}