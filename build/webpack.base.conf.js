
const config=require('./config');

module.exports={
    entry:{
        main:config.entry_path
    },
    resolve:{
        extensions:config.resolve_extensions_group,
        alias:config.resolve_alias
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include:config.src_path,
                exclude:/node_modules/
            },
            {
                test:/\.(woff|svg|eot|woff2|tff)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10000
                        }
                    }
                ],
                exclude:/node_modules/
            }
        ]
    }
}