var app = new Vue ({
    el: '#app',
    data: {
	animal: '',
	animals: ['Cat','Cow'],
	farm: [],
	i: 0,
    },
    created: function() {
	this.updateFarm();
    },
    methods: {
	updateFarm: function() {
	    if(this.animal === '') {
		return;
	    }

	    this.farm.push(this.animal);
	    this.animal = '';

	    this.i = Math.floor(Math.random() * (this.animals.length - 1) );
	}

    }
});
