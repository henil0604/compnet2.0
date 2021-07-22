
# Compnet2.0

A Easy to learn And Minimal Library to create DOM Elements with JavaScript.

## Importation

```html
<script src="/path/to/compnet.js"></script>
```

```compnet.js``` can be downloaded from [here](https://github.com/henil0604/compnet2.0/tree/main/dist)




## Usage

___

### Simple DOM Elements

```js

const button = new Component({
    tag: "button",
    innerHTML: "Hello World",
    styles: {
        minWidth: "fit-content",
        minHeight: "fit-content",
        width: "fit-content",
        height: "fit-content",
        padding: "10px",
        outline: "none",
        border: "none",
        borderRadius: "4px",
        transition: ".2s",
        backgroundColor: "#2195F1",
        color: "white",
        fontWeight: "700",
        cursor: "pointer",
        $hover$focus: {
            backgroundColor: "#FE0000",
        }
    },
})


document.body.append(button.DOM);

```

![](https://user-images.githubusercontent.com/62794871/126647722-78a1ab73-3b7a-4fb5-bf02-a69d10b97d3b.gif)

---

### Hover and Focus Effects


```js

const button = new Component({
    tag: "button",
    innerHTML: "Make me Red",
    styles: {
        ...
        $hover: {
            backgroundColor: "#FE0000",
        },
        $focus: {
            backgroundColor: "#FE0000"
        }
    },
})

```

![hover-focus-element](https://user-images.githubusercontent.com/62794871/126651278-330d89e0-0b9f-43d4-8abb-e7b32595c8a3.gif)


---


### ```$hover$focus``` state

This Will result same as previous Example

```js

const button = new Component({
    tag: "button",
    innerHTML: "Make me Red",
    styles: {
        ...
        $hover$focus: {
            backgroundColor: "#FE0000",
        }
    }
})

```

### Using ```id```

- You can pass ```id``` key in Config object to set the id of the Element

```js

new Component({
    ...
    id: "my_own_id"
    ...
})

```

#### Using ```randomId```

- By Default ```randomId``` is set to ```true```

```js


new Component({
    ...
    randomId: false
    ...
})

```

----

### Using ```className```

```js

new Component({
    ...
    className: "btn btn-primary m-5"
    ...
})

```

---

### Using styles

```js

new Component({
    ...

    styles: {
        // Normal Styles Goes Here
        $hover: {
            // All styles in here will apply when in hovering state
        },
        $focus: {
            // All Styles in here will apply when element is focused
        },
        $hover$focus: {
            // All styles in here will Apply At Both Hovering and Focused State
        }
    }

    ...
})


```

---

### Using Media Query

```js

new Component({
    ...
    styles: {
        ...
        $media: {
            '(max-width: 767px)': {
                // All Styles in here will be applyed when the query matches

                // And styles in here will be removed when media query changes to false
            }
        }
        ...
    },
    ...
})

```

- Library Uses ```matchMedia``` function in javascript

--------------------------------

### Using Attributes

```js

new Component({
    ...
    attributes: [
        {
            name: "src",
            value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
    ]
    ...
})


```

---

### Using Events

```js

new Component({
    ...
    events: [
        {
            event: "click",
            callback: (e)=>{
                console.log("I was Clicked");
            }
        }
    ]
    ...
})

```

---


### Embedding Children Elements

#### Passing JSON Object
```js

    new Component({
        ...

        childrens: [
            {
                tag: "button",
                innerHTML: "Hello I'm Children Element",
                styles: {
                    ...
                }
            }
        ]
        ...
    })

```

#### Passing Component Object
```js

    let button = new Component({
        ...
        tag: "button",
        innerHTML: "Hello I'm Children Element",
        styles: {
            ...
        }
        ...
    })

    new Component({
        ...
        childrens: [
            button
        ]
        ...
    })

```

#### Preventing Embedding

- By Using ```embeddable```, You can choose if the Component should be embedded anywhere or not.

```js

    new Component({
        ...
        tag: "button",
        innerHTML: "Hello I'm Children Element",
        styles: {
            ...
        }
        embeddable: false
        ...
    })


```


---

### Using Built-In Event Emitter

```js

let button = new Component({
    ...
})

button.Emitter.on("message", (msg)=>{
    console.log(msg) // It Will Print "Hello World" after 3 seconds
})

setTimeout(()=>{
    button.Emitter.emit("Hello World")
}, 3000)

```

- More About ```Event Emitter``` can be Found [here](https://www.npmjs.com/package/events)

---



# Coded With ❤️ By [Henil Malaviya](https://github.com/henil0604)