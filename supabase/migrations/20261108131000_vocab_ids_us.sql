-- As palavras trocadas para o inglês americano ganharam id novo (o id vem da palavra).
-- Leva o histórico de revisão do aluno para o id novo (nada é apagado).
update public.review_items r set item_id = m.new_id
from (values
  ('a1-m4-l1-v-surname', 'a1-m4-l1-v-last-name'),
  ('a1-m4-l4-v-opposite', 'a1-m4-l4-v-across-from'),
  ('a1-final-l2-v-opposite', 'a1-final-l2-v-across-from'),
  ('b1-m3-l1-v-i-reckon', 'b1-m3-l1-v-i-guess'),
  ('b2-m1-l4-v-summer-holidays', 'b2-m1-l4-v-summer-vacation'),
  ('c2-m1-l3-v-fancy-a', 'c2-m1-l3-v-wanna'),
  ('c2-m1-l3-v-reckon-so', 'c2-m1-l3-v-guess-so')
) as m(old_id, new_id)
where r.item_type = 'vocab' and r.item_id = m.old_id
  and not exists (select 1 from public.review_items x where x.user_id = r.user_id and x.item_type = 'vocab' and x.item_id = m.new_id);
