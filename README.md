# my-carousel

My carousel is a simple notes carousel Lit Component that contains a list of notes with customizable title and background color. The list of notes can either be set as a property of the component or/and notes can be added manually by providing a title and selecting a color through a form included in the my-carousel component.

## Install

Add my-carousel to your project:

```
npm i my-carousel-notebook
```

## Usage

Import into your module script:

```javascript
import { MyCarousel } from 'my-carousel-notebook';
```

or add to your html page:

```html
<script type="module" src="path/my-carousel.js"></script>
```

## Use it in your HTML

```html
<my-carousel></my-carousel>
```

## Component API

### Properties

#### items

The list of the notes to be displayed in JSON Array format. Default is empty.

```html
<my-carousel
  items='[
  { "title": "Item 1", "color": "blue" },
  { "title": "Item 2", "color": "green" }
]'
></my-carousel>
```

Object format of an item that needs to be sent:

```javascript
{
  title: string,
  color: string, // It should be a valid color "red", "#fcba03", etc
}
```

### Events

#### "click" event on left arrow

This event listener slides the carousel to the right bringing the previous item from the left into view.

#### "click" event on right arrow

This event listener slides the carousel to the left bringing the next item from the right into view.

#### "click" event on "Add" button

This event listener adds a new item to the items list based on what was inserted in the "Title" and "Color" input fields. The new item can be seen at the and of the carousel.
