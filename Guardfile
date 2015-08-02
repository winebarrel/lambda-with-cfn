guard :shell do
  watch(/(index.js|template.json)/) do |m|
    `lambchop -d index.js` +
    ('-' * 70) +
    `echo '{}' | lambchop-cat call-cfn -l tail`
  end
end
