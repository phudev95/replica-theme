((posts) => {
  var today = moment().startOf("day");
  var oneYearAgo = moment(today).subtract(1, "years").startOf("day");
  posts = posts.filter(function (post) {
    var postDate = moment(post.date, "YYYY-MM-DD").startOf("day");
    return postDate.isAfter(oneYearAgo);
  });

  var monthLabels = [];
  var monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var calendar = getCalendar(posts);

  var dateRange = {
    start: moment(oneYearAgo).format("MMM D, YYYY"),
    end: moment().format("MMM D, YYYY"),
  };

  var app = new Vue({
    el: "#calendar",
    data: {
      posts: posts,
      selectedDate: null,
      calendar: calendar,
      dateRange: dateRange,
      mouseoverDate: null,
      moment: moment,
      monthLabels: monthLabels,
    },
    created: function () {
      this.selectedDate = "none";
    },
    methods: {},
    computed: {
      svgtip: function () {
        var date = this.mouseoverDate;
        var display = date ? "block" : "none";
        if (date) {
          var coordinator = getIndexByDate(date);
          var x = coordinator[0];
          var y = coordinator[1];
          var len = this.calendar[x].days[y].posts.length;
          var text = len ? len + " contributions" : "No contributions";
          var left = coordinator[0] * 12 - 37 + "px";
          coordinator[1] = coordinator[0]
            ? coordinator[1]
            : coordinator[1] + oneYearAgo.day();
          var top = coordinator[1] * 12 + 12 - 32 + "px";
        }
        return {
          text: text,
          left: left,
          top: top,
          display: display,
        };
      },
      filteredPosts() {
        return this.posts.filter((post) => {
          return post.date === this.selectedDate;
        });
      },
    },
  });

  function getCalendar(posts) {
    var maxCount = 0;

    var tmr = moment(today).add(1, "days").startOf("day");
    var tmrStr = tmr.format("YYYY-MM-DD");
    var date = moment(oneYearAgo).startOf("day");

    var calendar = [];
    while (date.format("YYYY-MM-DD") !== tmrStr) {
      var day = date.day();
      if (day === 0 || calendar.length === 0) {
        var x = calendar.length * 13;
        calendar.push({
          transform: "translate(" + x + ",0)",
          days: [],
        });
      }

      calendar[calendar.length - 1].days.push({
        x: 14 - calendar.length,
        y: day * 12,
        date: date.format("YYYY-MM-DD"),
        posts: [],
      });

      if (day === 0 && date.date() < 8) {
        monthLabels.push({
          x: 14 - calendar.length + calendar.length * 13,
          text: monthName[date.month()],
        });
      }

      date.add(1, "days");
    }

    // handle post info
    posts.forEach(function (post) {
      var x = getIndexByDate(post.date)[0];
      var y = getIndexByDate(post.date)[1];

      calendar[x].days[y].posts.push({
        title: post.title,
        url: post.url,
      });

      var len = calendar[x].days[y].posts.length;
      maxCount = Math.max(len, maxCount);
    });

    // handle fill color
    calendar.forEach(function (week) {
      week.days.forEach(function (day) {
        day.fill = getColorByLength(day.posts.length, maxCount);
      });
    });

    return calendar;
  }

  function getIndexByDate(date) {
    date = moment(date, "YYYY-MM-DD").startOf("day");
    var firstColumnLen = 7 - oneYearAgo.day();
    var days = date.diff(oneYearAgo, "days");

    var x =
      days > firstColumnLen - 1
        ? Math.ceil((days - firstColumnLen + 1) / 7)
        : 0;
    var y =
      days > firstColumnLen - 1 ? date.day() : date.day() - oneYearAgo.day();
    return [x, y];
  }

  function getColorByLength(len, max) {
    var colors = ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"];
    var colorsLen = colors.length - 1;
    if (len === 0) return colors[0];

    var interval = max / colorsLen;
    if (max < colorsLen) {
      return colors[len];
    }

    return colors[Math.ceil(len / interval)];
  }
})(tbGlobalData.posts);
