Text = function (game, config) {
    this.setupConfiguration(config);

    this.game = game;
    this.values = this.myConfig.values;
    this.value = this.myConfig.value;
    this.base = this.myConfig.base;

    Phaser.Text.call(this, game, this.myConfig.x, this.myConfig.y, this.textBuilder(), this.myConfig.style);

}

Text.prototype = Object.create(Phaser.Text.prototype);
Text.prototype.constructor = Text;

Text.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        value: "",
        values: [],
        base: "BaseText",
        style: textBaseStyle
    }

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Text.prototype.update = function () {
    this.setText(this.textBuilder());
}

Text.prototype.textBuilder = function () {
    if (this.values.length > 0) {
        let res = this.base;
        for (let i = 0; i < this.values.length; i++) {
            let vals = this.values[i].split('.');
            let value = getValue(this.game, vals);
            if (parseInt(value) != NaN) res = res.replace('{value' + i + '}', parseInt(value));
            else res = res.replace('{value' + i + '}', value);

        }
        return res;
    } else {
        let vals = this.value.split('.');
        let value = getValue(this.game, vals);
        if (parseInt(value) != NaN) return this.myConfig.base.replace('{value}', parseInt(value));
        else return this.myConfig.base.replace('{value}', value);
    }

    function getValue(res, values) {
        if (res) {
            res = res[values.shift()];
            if (values.length > 0) return getValue(res, values);
            else return res;
        }
    }
}