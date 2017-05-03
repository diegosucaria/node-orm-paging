module.exports = Plugin;

function Plugin(db) {
    return {
        define: function (Model) {
            Model.settings.set("pagination.perpage", 20);

            Model.page = function (conditions, sort, n) {
                if (arguments.length === 1) {
                    n = conditions;
                    conditions = {};
                    sort = {};
                }
                else if(arguments.length === 2){
                    n = sort;
                    conditions = conditions || {};
                    sort = {};
                }else{
                    conditions = conditions || {};
                    sort = sort || {};
                }
                let perpage = Model.settings.get("pagination.perpage");

                return new Promise((resolve, reject) => {

                    this.find(conditions,sort).offset((n - 1) * perpage).limit(perpage).run(function (err, result) {
                        if (err) {
                            return reject(err)
                        }
                        return resolve(result)
                    });

                });

            };

            Model.pages = function (conditions) {

                conditions = conditions || {};

                return new Promise((resolve, reject) => {

                    Model.count(conditions, function (err, count) {
                        if (err) {
                            return reject(err)
                        }
                        return resolve(Math.ceil(count / Model.settings.get("pagination.perpage")));
                    });

                });

            };
        }
    };
}
