export const notifications = {
  state: {
    list: [
      {
        image: require('@/assets/images/aden.jpg'),
        title: 'Jane Doe Applied',
        message: 'Applied for <span class="orangeText">Fitness Influencer Wanted for Protein Brand</span>'
      },
      {
        image: require('@/assets/images/aden.jpg'),
        title: 'Jane Doe Bid',
        message: 'Bid On <span class="orangeText">Fitness Influencer Wanted for Protein Brand</span>'
      },
      {
        image: require('@/assets/icons/notifcation0.png'),
        title: 'Woo Hoo!',
        message: '<span class="orangeText">Campaign Name</span> Has Reached A 6% Engagement'
      },
      {
        image: require('@/assets/icons/notifcation1.png'),
        title: 'Your Campaign Is <span class="greenText">Active</span>',
        message: 'Fitness Influencer Wanted For Protein Brand Is Active'
      },
      {
        image: require('@/assets/icons/notifcation2.png'),
        title: 'New Review',
        message: 'Check Out Your Review For <span class="orangeText">Campaign Name</span>'
      },
      {
        image: require('@/assets/icons/notifcation3.png'),
        title: 'Ravyyn Support',
        message: 'You Have Received A Message From Ravyyn Support Team'
      },
      {
        image: require('@/assets/icons/notifcation4.png'),
        title: 'No Budget',
        message: 'Campaigns With BUdgets Added Receive More Applicants'
      },
      {
        image: require('@/assets/icons/notifcation5.png'),
        title: '2 Hour Edit Window',
        message: 'You Have 2 Hours To Edit Your Campaign Before It Goes Live'
      }
    ]
  },
  mutations: {
    removeNotification(state, index) {
      state.list.splice(index, 1)
    }
  }
}