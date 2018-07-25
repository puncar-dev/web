/* eslint-disable no-invalid-this */
var technologies = [
  '.NET', 'ASP .NET', 'Angular', 'Backbone', 'Bootstrap', 'C', 'C#', 'C++', 'CSS', 'CSS3',
  'CoffeeScript', 'Dart', 'Django', 'Drupal', 'DynamoDB', 'ElasticSearch', 'Ember', 'Erlang', 'Express', 'Go', 'Groovy',
  'Grunt', 'HTML', 'Hadoop', 'Jasmine', 'Java', 'JavaScript', 'Jekyll', 'Knockout', 'LaTeX', 'Mocha', 'MongoDB',
  'MySQL', 'NoSQL', 'Node.js', 'Objective-C', 'Oracle', 'PHP', 'Perl', 'Polymer', 'Postgres', 'Python', 'R', 'Rails',
  'React', 'Redis', 'Redux', 'Ruby', 'SASS', 'Scala', 'Sqlite', 'Swift', 'TypeScript', 'Websockets', 'WordPress', 'jQuery'
];

var removeFilter = function() {
  document.location.href = '/leaderboard';
};

$(document).ready(function() {
  var keyword_search = new URL(document.location.href);
  var keyword = keyword_search.searchParams.get('keyword');

  technologies.forEach(function(tech) {
    if (keyword === tech) {
      $('.tech-options').append(`<option value="${tech}" selected>${tech}</option>`);
    } else {
      $('.tech-options').append(`<option value="${tech}">${tech}</option>`);
    }
  });

  $('.leaderboard_entry .progress-bar').each(function() {
    const max = parseInt($(this).attr('aria-valuemax'));
    const now = parseInt($(this).attr('aria-valuenow'));
    const width = (now * 100) / max;

    $(this).css('width', `${width}%`);
  });

  $('.clickable-row').click(function(e) {
    if (typeof $(this).data('href') == 'undefined') {
      return;
    }
    window.location = $(this).data('href');
    e.preventDefault();
  });

  $('#key').change(function() {
    const val = $(this).val();

    document.location.href = `/leaderboard/${val}`;
  });

  $('#tech-keyword').change(function() {
    const keyword = $(this).val();

    if (keyword === 'all') {
      var new_location = window.location.href.split('?')[0];

      window.location.href = new_location;
    } else {
      window.location.href = window.location.href + `?keyword=${keyword}`;
    }
  });
});
