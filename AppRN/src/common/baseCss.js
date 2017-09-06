import {
    StyleSheet,
    PixelRatio,
    Platform,
    Dimensions
} from 'react-native';

export const baseCss = StyleSheet.create({
    row: {
        flexDirection: "row"
    },
    col1: {
        flex: 1
    },
    col2: {
        flex: 2
    },
    col3: {
        flex: 3
    },
    col4: {
        flex: 4
    },
    col5: {
        flex: 5
    },
    col6: {
        flex: 6
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    mainColor: {
        backgroundColor: "#f9f9f9"
    }
});

export const onePix = 1 / PixelRatio.get();

export const {width, height} = Dimensions.get("window");

export const getPix = (width) => {
    let pix = PixelRatio.get();
    if (Platform.OS == "android") {
        if (width > 1080) {
            return width / 3;
        }
        return width / 2;
    } else {
        // if (pix > 2) {
        //     return (width * pix / 2) / pix;
        // } else {
        //     return width / 2;
        // }
        return width / 2;
    }
}

export const topBarHeight = getPix(Platform.OS == "ios" ? 128 : 138);
