var swa = {
  pubToken: '84bf4b8e-f8b0-42e7-8c8a-e03377786443',
  baseUrl: 'https://webanalytics2.cfapps.eu10.hana.ondemand.com/tracker/',
  owner: null
  // set this to a function that returns the identifier of the tracked user
};
(function () {
  var d = document; var g = d.createElement('script'); var s = d.getElementsByTagName('script')[0]
  g.type = 'text/javascript'; g.defer = true; g.async = true; g.src = swa.baseUrl + 'js/track.js'
  s.parentNode.insertBefore(g, s)
})()
