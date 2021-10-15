# 以下のような入力テキストから、ラクローの自己申告用の集計を作るスクリプト
#
# 10:00 ~ 16:59
# 17:01 ~ 17:11
# 17:32 ~ 17:41
# 18:16 ~ 18:51

class TimeSpan
  DAY_BEGIN = 5 * 60
  NIGHT_BEGIN = 22 * 60
  NEXTDAY_NIGHT_BEGIN = 24 * 60

  attr_reader :begin_min_offset, :end_min_offset

  def initialize(begin_min_offset, end_min_offset)
    @begin_min_offset = begin_min_offset
    @end_min_offset = end_min_offset
    @duration_minutes = duration_minutes
  end

  def duration_minutes
    end_min_offset - begin_min_offset
  end

  def begin_time_str
    self.class.min_to_str(begin_min_offset)
  end

  def end_time_str
    self.class.min_to_str(end_min_offset)
  end

  def day_minutes
    [[end_min_offset, NIGHT_BEGIN].min - begin_min_offset, 0].max
  end

  def night_minutes
    [[NEXTDAY_NIGHT_BEGIN, end_min_offset].min - [NIGHT_BEGIN, begin_min_offset].max, 0].max
  end

  def nextday_night_minutes
    [end_min_offset - [NEXTDAY_NIGHT_BEGIN, begin_min_offset].max, 0].max
  end

  def to_s
    "#{begin_time_str} - #{end_time_str}"
  end

  class << self
    def min_to_str(min_offset)
      sprintf "%02d:%02d", min_offset / 60, min_offset % 60
    end

    def parse(line)
      m = /(\d{2}):(\d{2})\s*[-~]\s*(\d{2}):(\d{2})/.match(line)
      return if m.nil?

      begin_min = m[1].to_i * 60 + m[2].to_i
      end_min = m[3].to_i * 60 + m[4].to_i
      begin_min += 24 * 60 if begin_min < DAY_BEGIN
      end_min += 24 * 60 if end_min <= DAY_BEGIN

      TimeSpan.new(begin_min, end_min)
    end
  end
end

def read_time_spans(io)
  result = []
  io.each do |line|
    if (span = TimeSpan.parse(line))
      result << span
    end
  end
  result
end

def open_file_or_stdin(filename)
  if filename
    File.open(filename, 'r') do |io|
      yield io
    end
  else
    yield STDIN
  end
end

time_spans = nil
open_file_or_stdin(ARGV.shift) do |io|
  time_spans = read_time_spans(io)
end

if time_spans.empty?
  puts "No time spans."
  exit
end

# 重なりはないものと想定
time_spans.sort! { |a, b| a.begin_min_offset <=> b.begin_min_offset }

puts '## 入力'
#     00:00 - 00:00  00:00  00:00  00:00
puts "               日中   深夜   翌日深夜"
time_spans.each do |span|
  puts "#{span.to_s}  #{TimeSpan.min_to_str(span.day_minutes)}  #{TimeSpan.min_to_str(span.night_minutes)}  #{TimeSpan.min_to_str(span.nextday_night_minutes)}"
end

rest_min_sum = 0
time_spans.each_cons(2) do |(a, b)|
  rest_min_sum += (b.begin_min_offset - a.end_min_offset)
end
work_min_sum = time_spans.sum(&:duration_minutes)
day_min_sum = time_spans.sum(&:day_minutes)
night_min_sum = time_spans.sum(&:night_minutes)
nd_night_min_sum = time_spans.sum(&:nextday_night_minutes)

puts "\n## 集計結果"
puts "始業時間    : #{time_spans.first.begin_time_str}"
puts "終業時間    : #{time_spans.last.end_time_str}"
puts "日中        : #{TimeSpan.min_to_str(day_min_sum)}"
puts "深夜        : #{TimeSpan.min_to_str(night_min_sum)}"
puts "翌日深夜    : #{TimeSpan.min_to_str(nd_night_min_sum)}"
puts "労働時間合計: #{TimeSpan.min_to_str(work_min_sum)}"
puts "休憩時間合計: #{TimeSpan.min_to_str(rest_min_sum)}"
