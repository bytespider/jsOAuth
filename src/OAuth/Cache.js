function OAuthCache(options) {
    if (arguments.length > 0) {
        this.init(options);
    }
    
    var cache_id = '';
    var cache_data;

    this.init = function (options) {/*stub*/};
    
    this.load = function (id) {
        cache_id = id || cache_id || '';
        cache_data = window.localStorage.getItem(cache_id);
        return cache_data;
    };

    this.save = function (data, id) {
        cache_id = id || cache_id || '';
        cache_data = data ? cache_data : {};
        window.localStorage.setItem(cache_id, cache_data);
    };
    
    this.toString = function () {
        return cache_data;
    }
}
