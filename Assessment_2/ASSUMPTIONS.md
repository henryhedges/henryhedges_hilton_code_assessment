## assumptions for the functioning of the ui:
1) There are only 4 rooms (no more, no less) that a person can reserve.
2) There is always a minimum of one room reservation that the user must submit.
3) There is no data that will be retrieved on the very first render.
4) There can be rooms with all children, all adults or a combination of the two.
5) There is not a need currently to reposition the order of the rooms - this could come into play if a user wanted to schedule a room for a specific person or group of people and avoid having one disabled.
6) There is not a need to save the current state of a users selection when they change a value (only saves when clicking 'submit'). Saving changes locally on any change could be a nice UX benefit, then the submit button could be used to save the selections to a database. 
7) There are no transition effects or loaders that show after successfully saving selections.
8) Pricing is not a concern to the user.
9) Location is not a concern to the user.

## considerations for how the code is written:
1) Proof of concept - there is no application-wide state management added like redux, there is one component that does the heavy lifting and its state. 
2) Renamed ‘children’ in the data to ‘kids’; this is because there may be conflicts with the children prop in react when passed.
3) App component's purpose in this app is to hold the Layout and Content components. This does little at the moment and Layout could have replaced App. My thoughts were to design the component structure to be more easily manipulated if the application were to grow. Another alternative would be to move all of the functionality of Content up into App. However, if there was a need to add a nav bar,side panel, footer, etc. the component structure would get crowded and most likely would need to get refactored anyway.
4) Used localStorage to cache data.
5) It uses Reboot.css from bootstrap to set base styles.
6) Chose to design the state in a way to access data quickly and take advantage of component mapping in the render() method.
7) Incoming data (coming from local storage) will have a 'selected' field. This would likely not be added to the data if retrieved from an API.