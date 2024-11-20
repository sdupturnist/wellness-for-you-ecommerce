


"use client";

import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    GabIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon,
    XIcon,
  } from "react-share";

export default function SocialShare() {


    // const shareUrl = "https://your-website-url.com"; // URL to share
    // const title = "Check out this awesome website!";
    // const hashtag = "#ReactShare";



  return (
    <div className="flex gap-2">
     <FacebookShareButton url={'test'} quote={'tets'}>
          <FacebookIcon className="icon-social-share"/>
        </FacebookShareButton>
        <EmailShareButton url={'test'} quote={'tets'}>
        <EmailIcon className="icon-social-share"/>
        </EmailShareButton>
        <LinkedinShareButton url={'test'} quote={'tets'}>
        <LinkedinIcon className="icon-social-share"/>
        </LinkedinShareButton>
        <TwitterShareButton url={'test'} quote={'tets'}>
        <TwitterIcon className="icon-social-share"/>
        </TwitterShareButton>
        <WhatsappShareButton url={'test'} quote={'tets'}>
        <WhatsappIcon className="icon-social-share"/>
        </WhatsappShareButton>
    </div>
  );
}
