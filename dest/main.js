let restaurants,neighborhoods,cuisines;var map,markers=[];"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js",{scope:"/"}).then(function(e){console.log("ServiceWorker registration successful")},function(e){console.log(`ServiceWorker registration failed: ${e}`)})}),document.addEventListener("DOMContentLoaded",e=>{fetchNeighborhoods(),fetchCuisines()}),fetchNeighborhoods=(()=>{DBHelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})}),fillNeighborhoodsHTML=((e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");e.forEach(e=>{const s=document.createElement("option");s.innerHTML=e,s.value=e,t.append(s)})}),fetchCuisines=(()=>{DBHelper.fetchCuisines((e,t)=>{e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})}),fillCuisinesHTML=((e=self.cuisines)=>{const t=document.getElementById("cuisines-select");e.forEach(e=>{const s=document.createElement("option");s.innerHTML=e,s.value=e,t.append(s)})}),window.initMap=(()=>{self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),updateRestaurants()}),updateRestaurants=(()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),s=e.selectedIndex,n=t.selectedIndex,r=e[s].value,a=t[n].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(r,a,(e,t)=>{e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})}),resetRestaurants=(e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(e=>e.setMap(null)),self.markers=[],self.restaurants=e}),fillRestaurantsHTML=((e=self.restaurants)=>{const t=document.getElementById("restaurants-list");e.forEach(e=>{t.append(createRestaurantHTML(e))}),addMarkersToMap()}),setImgSrcset=((e,t)=>`${e}-800px.${t} 800w,\n\t${e}-650px.${t} 650w,\n\t${e}-500px.${t} 500w,\n\t${e}-350px.${t} 350w,\n\t${e}-220px.${t} 220w`),createRestaurantHTML=(e=>{const t=document.createElement("li"),s=document.createElement("figure"),n=document.createElement("picture"),r=document.createElement("source"),a=document.createElement("img"),o=DBHelper.imageUrlForRestaurant(e);r.type="image/webp",r.setAttribute("data-srcset",setImgSrcset(o,"webp")),r.setAttribute("data-sizes","auto"),a.className="restaurant-img lazyload blur-up",a.alt=`Picture of ${e.name} restaurant`,a.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",a.setAttribute("data-srcset",setImgSrcset(o,"jpg")),a.setAttribute("data-sizes","auto"),a.setAttribute("data-src",`${o}.jpg`),n.append(r),n.append(a),s.className="restaurant-img-cont",s.append(n),t.append(s);const c=document.createElement("h3");c.innerHTML=e.name,t.append(c);const i=document.createElement("p");i.innerHTML=e.neighborhood,t.append(i);const l=document.createElement("p");l.innerHTML=e.address,t.append(l);const d=document.createElement("a");return d.innerHTML="View Details",d.className="btn-more",d.href=DBHelper.urlForRestaurant(e),t.append(d),t}),addMarkersToMap=((e=self.restaurants)=>{e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",()=>{window.location.href=t.url}),self.markers.push(t)})});