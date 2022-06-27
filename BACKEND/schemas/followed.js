export default{
    name:'followed',
    title: 'Followed',
    type: 'document',
    fields : [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
        {
            name: 'follower',
            title: 'Follower',
            type: 'number',
          },
        {
            name: 'profilePicture',
            title: 'ProfilePicture',
            type: 'string',
          },
          {
            name: 'likes',
            title: 'Likes',
            type: 'array',
            of : [
                {type: 'string'}
            ]
        },
          {
            name:'followed',
            title: 'Followed',
            type: 'array',
            of : [
                {type: 'string'}
            ]
        },
          {
            name:'followedBy',
            title: 'FollowedBy',
            type: 'array',
            of : [
                {type: 'string'}
            ]
        },
    ]
}