import Overlay from 'ol/Overlay';

class OLOverlay extends HTMLElement {
    constructor() {
        super();
        this.overlay = new Overlay({});
        //this.hidden = true
    }

    connectedCallback(){
        if (this.isConnected == false) {
            return;
        }

        if(this.overlay.getElement()){
            return;
        }

        requestAnimationFrame(()=>{
            const fragment = document.createDocumentFragment();

            while(this.firstElementChild){
                fragment.appendChild(this.firstElementChild);
            }
    
            this.overlay.setElement(fragment);
        });

        const map = this.getMap();
        map.addOverlay(this.overlay);
        this.overlay?.element?.classList.add('ol-popup');
    }

    getOverlayContainer(){
        return this.overlay?.element;
    }

    setProperties(properties){
        this.overlay.setProperties(properties, true);
    }

    setPosition(position) {
        this.overlay.setPosition(position);
    }

    close(){
        this.overlay.setPosition(undefined);
    }

    isVisible(){
        return this.overlay.getPosition() != undefined;
    }

    getMap(){
        return this.parentElement.getMap();
    }

}

export default OLOverlay;
