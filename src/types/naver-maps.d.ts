declare namespace naver {
  namespace maps {
    class Map {
      constructor(element: string | HTMLElement, options: MapOptions)
    }
    class LatLng {
      constructor(lat: number, lng: number)
    }
    class Marker {
      constructor(options: MarkerOptions)
    }
    class InfoWindow {
      constructor(options: InfoWindowOptions)
      open(map: Map, marker: Marker): void
    }
    interface MapOptions {
      center: LatLng
      zoom: number
      mapTypeId?: string
    }
    interface MarkerOptions {
      position: LatLng
      map: Map
      title?: string
      icon?: MarkerImage | string
    }
    interface MarkerImage {
      url: string
      size?: Size
      anchor?: Point
    }
    interface InfoWindowOptions {
      content: string
      borderWidth?: number
      backgroundColor?: string
      borderColor?: string
      anchorSize?: Size
    }
    class Size {
      constructor(width: number, height: number)
    }
    class Point {
      constructor(x: number, y: number)
    }
  }
}
