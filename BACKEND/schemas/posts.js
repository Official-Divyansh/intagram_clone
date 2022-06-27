export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'Id',
            type: 'number'
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'caption',
            title: 'Caption',
            type: 'string'
        },
        {
            name: 'watchList',
            title: 'WatchList',
            type: 'boolean'
        },
        {
            name:'image',
            title: 'Image',
            type: 'string'
           
        },
    ]
}