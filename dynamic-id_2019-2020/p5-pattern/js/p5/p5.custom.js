//version 0.2;

(function() {

    const loadImage = p5.prototype.loadImage;
    p5.prototype.loadImage = function() {

        let pImg = loadImage.apply(this, arguments);

        fetch(arguments[0]).then(function(response) {
            if (response.headers.get('content-type').includes('svg')) {
                response.blob().then(function(blob) {
                    const objectURL = URL.createObjectURL(blob);
                    let image = new Image();
                    image.onload = function() {
                        pImg.canvas = this; //set image object instead of canvas
                        this.onload = null;
                    };
                    image.src = objectURL;
                });
            }
        });

        return pImg;
    }

    p5.prototype.noFill = function() {
        this.drawingContext.fillStyle = 'rgba(0,0,0,0)';
    }

    p5.prototype.clip = function() {
        this.drawingContext.clip();
    }

    const fill = p5.prototype.fill;
    p5.prototype.fill = function() {

        const p5Elem = arguments[0];
        const isImage = (p5Elem instanceof p5.Element || p5Elem instanceof p5.Image);

        if (isImage) {
            this._renderer._setFill(applyPattern.call(this, ...arguments));
        } else {
        	fill.apply(this, arguments);
        }
    }

    const stroke = p5.prototype.stroke;
    p5.prototype.stroke = function() {

        const p5Elem = arguments[0];
        const isImage = (p5Elem instanceof p5.Element || p5Elem instanceof p5.Image);

        if (isImage) {
            this._renderer._setStroke(applyPattern.call(this, ...arguments));
        } else {
        	stroke.apply(this, arguments);
        }
    }

    function applyPattern() {
    	const p5Elem = arguments[0];
        const mode = arguments[1] || "repeat";
        const transforms = arguments[2] || function() {};
        const ctx = this.drawingContext;
        const pattern = this.drawingContext.createPattern(p5Elem.canvas, mode);

        ctx.save();
        ctx.resetTransform();
        let px = 1 / this._pixelDensity;
        ctx.scale(px, px);
        this.push();
        transforms.call();
        // ctx.translate(p5Elem.canvas.width / 2, p5Elem.canvas.height / 2);
        const matrix = ctx.getTransform();
        this.pop();
        ctx.restore();

        pattern.setTransform(matrix);

        return pattern;

    }
})();