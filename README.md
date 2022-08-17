![chargingmapposter](https://user-images.githubusercontent.com/36485235/185093944-546ec5dc-31f0-4d00-80d8-ce270b2d6794.png)

# Charging Map
Charging Map to search and view charging points of Germany provided by an [own REST API](https://github.com/jongwon254/Charging-API).

## Technologies
- Languages: Python, TypeScript, JavaScript, HTML, and CSS
- Backend: 
  - REST API built with Django and PostgreSQL
  - Data from the Bundesnetzagentur
- Frontend: 
  - Built with Angular, Bootstrap, and MapBox
  
## Functionality
- The integrated map shows all charging points of Germany
- The user can use the mouse or the navigation controls to move around the map
- It also supports a full-screen mode for optimal visibility and it automatically centers at the current location (after permission)
- All charging points are also listed in the results table
- The user can retrieve detailed information, such as ID, location, power, or number of ports
- Users can control the amount of information displayed and they can add charging points to favorites
- Users can also search trough the 30,397 available charging stations. They can, e.g., look for a specific charging point or stations in their city 
- The reset-button clears all filters
- The data is retrieved from the [Charging API](https://github.com/jongwon254/Charging-API) that is connected to a PostgreSQL database

## Screenshots
<img width="1209" alt="charging" src="https://user-images.githubusercontent.com/36485235/185095453-75143708-2f00-4020-837e-a514e53f9751.png">
<img width="1265" alt="map2copy" src="https://user-images.githubusercontent.com/36485235/185096449-705938ff-454f-4d87-a2e9-c96714004d67.png">
<img width="400" alt="search2" src="https://user-images.githubusercontent.com/36485235/185095889-c50f12f7-6b4c-4da2-94b8-79634e9f5c92.png">
<img width="810" alt="results3" src="https://user-images.githubusercontent.com/36485235/185096134-ef05eed4-034c-4b8b-8698-60c4cfc842f0.png">

## More Info
[Visit Website](https://jongwonlee.dev/charging-map)
