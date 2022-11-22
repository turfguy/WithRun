export const initialState = {
    mainPosts:[
        {
            id: 1,
            User : 
            {
                id: 1,
                nickname: '이스라엘 아데산야',

            },
            content :  'selfie #오늘의훈남 #팔로우 #맞팔',
            Images: [
                    {src : 'https://a.espncdn.com/media/motion/2020/0309/dm_200309_ufc_adesanya_helwani_int/dm_200309_ufc_adesanya_helwani_int.jpg'},
            ],

            Comments: 
            [ 
                    {
                        User:{ nickname: '파울로 코스타',},
                        content: '내 사진 지우라고',
                     },
                    {
                      
                        User:{ nickname: '데이나 화이트',},
                        content: '잘나왔네요.^^',
                    },
                    {
                        User:{ nickname: '알렉산더 볼카노프스키',},
                        content: '함뜰까?',
                    },
        
                    
                ],
            },   
            {
                id: 2,
                User : 
                {
                    id: 2,
                    nickname: '닉워커',
    
                },
                content :  '역시 슬림한게 좋아',
                Images: [
                    {src : 'https://pbs.twimg.com/media/EmAbI01VkAAR8t-.jpg'},
                    {src : 'https://pbs.twimg.com/media/FO2gZ3RUYAQ3Jge.jpg'},
                    {src : 'https://i.pinimg.com/736x/9b/ae/2c/9bae2cca61950d451e659d5046e7604b.jpg'}
                 
                ],
    
                Comments: 
                [
                        {
                            User:{ nickname: '크리스 범스테드',},
                            content: 'Lifetime Natural..🔥🔥',
                        },
                        {
                            User:{ nickname: '간고',},
                            content: '하체가 도봉구 고등부급이네요..',
                        }]
                },
            
        ],
    imagePaths: [],
    postAdded : false
};

const ADD_POST = 'ADD_POST';
export const addPost = {
    type : ADD_POST,
}

const dummyPost = {
    id: 1,
    User : 
    {
        id: 1,
        nickname: '프란시스 은가누',

    },
    content :  '상급 노하우 공유합니다 O10-o123-43o3 톡 문의 ',
    Images: [


    ],
    Comments : []

}
const reducer = ( state = initialState , action ) =>
{
    switch (action.type)
    {
        case ADD_POST:
            return{
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded : true,
            };
        default:
            return state;
    }
};

export default reducer;
