pragma solidity ^0.5.11;

contract Youtube{


    uint public totalVideos = 0;
    struct video{
        uint Id;
        string ipfslink;
        string about;
    }
    video[] public videos;
    function putVideo(string memory link,string memory _about) public{
        videos.push(video(totalVideos,link,_about));
        totalVideos++;
    }


}