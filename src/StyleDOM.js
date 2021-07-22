function setOnHover(DOM, styles) {

    DOM.addEventListener("mouseenter", () => {

        // if (document.activeElement == DOM) return;

        DOM.__COMPONENT_MOUSEENTER_EVENT_STYLES = {};

        for (let i = 0; i < Object.keys(styles).length; i++) {
            let key = Object.keys(styles)[i];
            let value = styles[key];

            DOM.__COMPONENT_MOUSEENTER_EVENT_STYLES[key] = DOM.style[key];
            DOM.style[key] = value;
        }

    })

    DOM.addEventListener("mouseleave", () => {
        if (!DOM.__COMPONENT_MOUSEENTER_EVENT_STYLES) return;

        for (let i = 0; i < Object.keys(DOM.__COMPONENT_MOUSEENTER_EVENT_STYLES).length; i++) {
            let key = Object.keys(DOM.__COMPONENT_MOUSEENTER_EVENT_STYLES)[i];

            if (DOM.__COMPONENT_FOCUS_EVENT_STYLES != undefined && DOM.__COMPONENT_FOCUS_EVENT_STYLES[key] != undefined) {
                continue;
            }

            DOM.style[key] = DOM.__COMPONENT_ORIGINAL_STYLES[key] == undefined ? "" : DOM.__COMPONENT_ORIGINAL_STYLES[key];
        }

        delete DOM.__COMPONENT_MOUSEENTER_EVENT_STYLES;

    })


    return DOM;
}

function setOnFocus(DOM, styles) {

    DOM.addEventListener("focus", () => {

        DOM.__COMPONENT_FOCUS_EVENT_STYLES = {};

        for (let i = 0; i < Object.keys(styles).length; i++) {
            let key = Object.keys(styles)[i];
            let value = styles[key];

            DOM.__COMPONENT_FOCUS_EVENT_STYLES[key] = DOM.style[key];
            DOM.style[key] = value;
        }

    })

    DOM.addEventListener("blur", () => {
        if (!DOM.__COMPONENT_FOCUS_EVENT_STYLES) return;

        for (let i = 0; i < Object.keys(DOM.__COMPONENT_FOCUS_EVENT_STYLES).length; i++) {
            let key = Object.keys(DOM.__COMPONENT_FOCUS_EVENT_STYLES)[i];

            if (DOM.__COMPONENT_MOUSEENTER_EVENT_STYLES != undefined && DOM.__COMPONENT_MOUSEENTER_EVENT_STYLES[key] != undefined) {
                continue;
            }

            DOM.style[key] = DOM.__COMPONENT_ORIGINAL_STYLES[key] == undefined ? "" : DOM.__COMPONENT_ORIGINAL_STYLES[key];
        }

        delete DOM.__COMPONENT_FOCUS_EVENT_STYLES;
    })


    return DOM;
}

function setMediaStyle(DOM, styles) {

    for (let i = 0; i < Object.keys(styles).length; i++) {
        let key = Object.keys(styles)[i];
        let style = styles[key];

        let mediaQuery = matchMedia(key);

        mediaQuery.onchange = () => {
            if (!mediaQuery.matches) {
                ;
                if (DOM[`__COMPONENT_MEDIAQUERY_${key}`] == undefined) return;

                for (let i = 0; i < Object.keys(DOM[`__COMPONENT_MEDIAQUERY_${key}`]).length; i++) {

                    let $key = Object.keys(DOM[`__COMPONENT_MEDIAQUERY_${key}`])[i];

                    DOM.style[$key] = DOM.__COMPONENT_ORIGINAL_STYLES[$key] == undefined ? '' : DOM.__COMPONENT_ORIGINAL_STYLES[$key];

                }
                delete DOM[`__COMPONENT_MEDIAQUERY_${key}`];

                return;
            };

            DOM[`__COMPONENT_MEDIAQUERY_${key}`] = {};
            for (let i = 0; i < Object.keys(style).length; i++) {
                let $key = Object.keys(style)[i];
                let $value = style[$key];

                DOM[`__COMPONENT_MEDIAQUERY_${key}`][$key] = $value;
                DOM.style[$key] = $value;
            }

        }

        window.addEventListener("resize", (e) => {
            mediaQuery.onchange()
        })

        mediaQuery.onchange();
    }

    return DOM;
}

export default (DOM, styles) => {
    for (let i = 0; i < Object.keys(styles).length; i++) {
        let key = Object.keys(styles)[i];
        let value = styles[key];

        DOM.__COMPONENT_ORIGINAL_STYLES = styles;

        if (key == "$hover") {
            DOM = setOnHover(DOM, value);
        } else if (key == "$focus") {
            DOM = setOnFocus(DOM, value);
        } else if (key == "$hover$focus") {
            DOM = setOnHover(DOM, value);
            DOM = setOnFocus(DOM, value);
        } else if (key == "$media") {
            DOM = setMediaStyle(DOM, value);
        } else {
            DOM.style[key] = value;
        }
    }

    return DOM;
}