module.exports = Plugin;

function Plugin(db) {
    return {
        define: function (Model) {
            Model.settings.set("pagination.perpage", 20);

            Model.page = function (conditions, n) {
                if (arguments.length === 1) {
                    n = conditions;
                    conditions = {};
                }
                else {
                    conditions = conditions || {};
                }
                let perpage = Model.settings.get("pagination.perpage");

                return new Promise((resolve, reject) => {

                    this.find(conditions).offset((n - 1) * perpage).limit(perpage).run(function (err, result) {
                        if (err) {
                            return reject(err)
                        }
                        return resolve(result)
                    });

                });

            };

            Model.pages = function (conditions, cb) {
                if (arguments.length === 1) {
                    cb = conditions;
                    conditions = {};
                }
                else {
                    conditions = conditions || {};
                }

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
