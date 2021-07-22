var EventEmitter = require('events');
import helpers from './helpers';
import StyleDOM from './StyleDOM';

function filterConfig(config = {}) {

    if (!helpers.validators.isObject(config)) {
        config = {};
    };

    config = helpers.validators.setDefault(config, "tag", "div");
    config = helpers.validators.setDefault(config, "innerHTML", "");
    config = helpers.validators.setDefault(config, "value", "");
    config = helpers.validators.setDefault(config, "id", "");
    config = helpers.validators.setDefault(config, "name", "");
    config = helpers.validators.setDefault(config, "className", "");
    config = helpers.validators.setDefault(config, "randomId", true);
    config = helpers.validators.setDefault(config, "embeddable", true);
    config = helpers.validators.setDefault(config, "styles", {});
    config = helpers.validators.setDefault(config, "attributes", []);
    config = helpers.validators.setDefault(config, "events", []);
    config = helpers.validators.setDefault(config, "childrens", []);

    return config;
};


class Component {

    constructor(config) {
        this.config = filterConfig(config);
        this.state = {
            Emitter: new EventEmitter()
        }
    };

    get DOM() {
        let DOM = document.createElement(this.config.tag);

        DOM.innerHTML = this.config.innerHTML;

        if (DOM.value != undefined) {
            DOM.value = this.config.value;
        }

        DOM.className = this.config.className;
        DOM.id = this.config.id;
        DOM.name = this.config.name;

        if (this.config.randomId == true && this.config.id == "") {
            DOM.id = helpers.randomBytes(11);
        }

        DOM = StyleDOM(DOM, this.config.styles);

        for (let i = 0; i < this.config.attributes.length; i++) {
            const element = this.config.attributes[i];
            DOM.setAttribute(element.name, element.value);
        }

        for (let i = 0; i < this.config.events.length; i++) {
            const element = this.config.events[i];
            DOM.addEventListener(element.event, element.callback);
        }

        for (let i = 0; i < this.config.childrens.length; i++) {
            const element = this.config.childrens[i];

            if (element instanceof Component) {
                if (!element.config.embeddable) continue;

                DOM.appendChild(element.DOM);
            } else {
                if (!element.embeddable && element.embeddable != undefined) continue;

                const childDOM = new Component(element);
                DOM.appendChild(childDOM.DOM);
            }
        }

        return DOM;
    };

    get Emitter() {
        return this.state.Emitter;
    }

}


export default Component;