const path =require('path')
exports.cssLoaders=function(options){
    options=options||{}

    const styleLoader={
        loader:"style-loader",
        options:{
            sourceMap:options.sourceMap
        }
    }

    const cssLoader={
        loader:"css-loader",
        options:{
            sourceMap:options.sourceMap,
            camelCase:true
        }
    }


    const postcssLoader={
        loader:"postcss-loader",
        options:{
            sourceMap:options.sourceMap
        }
    }

    function generateLoaders(loader,loaderOptions){
        const loaders=options.usePostCSS?[styleLoader,cssLoader,postcssLoader]:[styleLoader,cssLoader];

        if(loader){
            loaders.push({
                loader:loader+'-loader',
                options:Object.assign({},loaderOptions,{
                    sourceMap:options.sourceMap
                })
            })
        }

        if(options.useTypescriptCssModule){
            loaders.push({
                loader:'typed-css-modules-loader',
                options:{
                    modules: true,
                }
            })
        }

        return loaders;
    }

    return {
        css:generateLoaders(),
        less:generateLoaders('less'),
    }
}

exports.styleLoaders=function(options){
    const output=[];
    const loaders=exports.cssLoaders(options);

    for(const extension in loaders){
        const loader=loaders[extension];
        output.push({
            test:new RegExp("\\."+extension+"$"),
            include: path.resolve('src/'),
            use:loader
        })
    }

    return output;
}
