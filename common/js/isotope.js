$(document).ready(function () {

    var $grid;

    $grid = $(".wrap").isotope({ //모션을 적용할 박스의 부모 선택자명
        itemSelector: ".wrap article", //모션을 적용할 박스 선택자명
        columnWidth: ".wrap article", // 너비값을 구할 박스 선택자명
        transitionDuration: "0.8s", // 모션 이동 속도
        percentPosition: true
    });
    // 필터 메뉴 클릭 이벤트
    $(".filter li a").on("click", function (e) {
        e.preventDefault();

        // 클릭한 메뉴의 href 값을 가져옴
        var sort = $(this).attr("href");

        // isotope 필터링 실행
        $grid.isotope({
            filter: sort
        });

        // 모든 메뉴의 on 클래스 제거 후 클릭한 메뉴에만 on 클래스 추가
        $(".filter li a").removeClass("on");
        $(this).addClass("on");
    });

    // isotope 옵션 설정
    var option = {
		itemSelector: '.wrap article',
	};
    // 이미지 로드 후 isotope 실행
    var $container = $('.wrap').imagesLoaded( function() {
		$container.isotope(option);
	});
});